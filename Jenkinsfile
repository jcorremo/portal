pipeline {
    agent { 
        label 'nodejs'
    }

 tools {
  nodejs "NodeJS"
 }

 environment {
  APPLICATION_NAME = 'portal'
  GIT_REPO = "http://gitlab.innovacioneveris.tech/producto-digital/01-app-web-carro-compras.git"
  GIT_BRANCH = "master"
  STAGE_TAG = "promoteToProduction"
  DEV_PROJECT = "poc-dev"
  STAGE_PROJECT = "poc-prod"
  TEMPLATE_NAME = "angular-app"
  ARTIFACT_FOLDER = "dist"
  ARTIFACT = "${APPLICATION_NAME}_${BUILD_NUMBER}.tar.gz"
  PORT = 8081;
  
 }

 stages {
  /*
  stage('Get Latest Code') {
	  steps {
		  git branch: "${GIT_BRANCH}", url: "${GIT_REPO}", credentialsId: "app-web-gitlab"
	  }
  }
  */
  stage("Install Dependencies") {
   steps {
    sh 'rm -rf node_modules'
    sh 'rm package-lock.json'
    sh 'npm remove -g @angular/cli'
    sh 'npm install -g @angular/cli@7.3.9'
    sh 'npm install'
   }
  }
  stage('Build') {
   steps {
    sh 'ng build'
   }
  }


  stage('Static code analysis') {
   environment {
    scannerHome = tool 'sonar'
   }
   steps {
    withSonarQubeEnv('sonarqube') {
     sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=${APPLICATION_NAME} -Dsonar.projectName=${APPLICATION_NAME} -Dsonar.projectVersion=1.0 -Dsonar.sources=. -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info -Dsonar.exclusions=test/*"
    }
   }
  }


  stage('Store Artifact') {
   steps {
    script {
     sh "tar -czvf ${ARTIFACT} Dockerfile default.conf ${ARTIFACT_FOLDER}/"
     nexusArtifactUploader artifacts: [
      [artifactId: 'angular-openshift', classifier: '', file: "${ARTIFACT}", type: 'tar']
     ], credentialsId: 'poc-dev-nexus', groupId: 'com.aval', nexusUrl: 'nexus.innovacioneveris.tech:80', nexusVersion: 'nexus3', protocol: 'http', repository: 'front-angular/', version: '${BUILD_NUMBER}'
    }
   }
  }

  stage('Create Image Builder') {
   when {
    expression {
     openshift.withCluster() {
      openshift.withProject(DEV_PROJECT) {
       return !openshift.selector("bc", "${TEMPLATE_NAME}").exists();
      }
     }
    }
   }
   steps {
    script {
     openshift.withCluster() {
      openshift.withProject(DEV_PROJECT) {
       openshift.newBuild("--name=${TEMPLATE_NAME}", "--docker-image=nginx:1.13.3-alpine", "--binary=true")
      }
     }
    }
   }
  }
  stage('Build Image') {
   steps {
    script {
     openshift.withCluster() {
      openshift.withProject(env.DEV_PROJECT) {
       openshift.selector("bc", "${TEMPLATE_NAME}").startBuild("--from-archive=${ARTIFACT}", "--wait=true")
      }
     }
    }
   }
  }
  stage('Deploy To Dev') {
   when {
    expression {
     openshift.withCluster() {
      openshift.withProject(env.DEV_PROJECT) {
       return !openshift.selector('dc', "${TEMPLATE_NAME}").exists()
      }
     }
    }
   }
   steps {
    script {
     openshift.withCluster() {
      openshift.withProject(env.DEV_PROJECT) {
       def app = openshift.newApp("${TEMPLATE_NAME}:latest")
       app.narrow("svc").expose("--port=${PORT}");
       def dc = openshift.selector("dc", "${TEMPLATE_NAME}")
       while (dc.object().spec.replicas != dc.object().status.availableReplicas) {
        sleep 10
       }
      }
     }
    }
   }
  }
  stage('Promote to STAGE?') {
  steps {
      timeout(time:20, unit:'MINUTES') {
           input message: "Promover a produccion?", ok: "Promover"
      }
      script {
          openshift.withCluster() {
          openshift.tag("${DEV_PROJECT}/${TEMPLATE_NAME}:latest", "${STAGE_PROJECT}/${TEMPLATE_NAME}:${STAGE_TAG}")
            }
        }
   }
 }
 stage('Rollout to Production') {
  steps {
      script {
            openshift.withCluster() {
              openshift.withProject(STAGE_PROJECT) {
                  if (openshift.selector('dc', '${TEMPLATE_NAME}').exists()) {
                      openshift.selector('dc', '${TEMPLATE_NAME}').delete()
                      openshift.selector('svc', '${TEMPLATE_NAME}').delete()
                       openshift.selector('route', '${TEMPLATE_NAME}').delete()
                }
            openshift.newApp("${TEMPLATE_NAME}:${STAGE_TAG}").narrow("svc").expose("--port=${PORT}")
            }
         }
      }
  }
}
 
 }

 post {
  always {
   script {
    committerEmail = sh(
     script: 'git --no-pager show -s --format=\'%ae\'',
     returnStdout: true
    ).trim()
	committerUser = committerEmail.split('@')[0]
    def body = '''{
    "repository": {
     "origin": "''' + env.GIT_REPO + '''",
     "branch": "'''+env.GIT_BRANCH+'''",
     "developerName": "'''+committerUser+'''",
     "developerMail": "'''+committerEmail+'''"
    },
    "pipeline": {
     "origin": "'''+currentBuild.absoluteUrl+'''",
     "name": "'''+currentBuild.projectName+'''",
     "status": "'''+currentBuild.currentResult+'''",
     "duration": '''+currentBuild.duration+''',
     "date": "'''+currentBuild.startTimeInMillis+'''",
     "build": '''+ currentBuild.number+'''
    },
    "codeQuality": {
     "taskID": "'''+env.APPLICATION_NAME+'''"
    }
   }
   '''
   httpRequest contentType: 'APPLICATION_JSON_UTF8',
    httpMode: 'POST', requestBody: body,
    url: 'http://35.235.98.38:9092/openshift/smart'
  }
  deleteDir()
 }
}
}
