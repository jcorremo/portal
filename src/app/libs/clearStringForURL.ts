export const clearStringForURL = (text: string) => {
  const characters = [
    'áàâãªä:a',
    'éèêë:e',
    'íìîï:i',
    'óòôõºö:o',
    'úùûü:u',
    'ç:c',
    'ñ:n',
    '–:-',
    '’‘‹›‚: ',
    '“”«»„: ',
  ];

  return text ? text.toLowerCase().replace(/[^\w\s]/g, (especialCharacter) => {
    const regValue = new RegExp(especialCharacter);

    return characters.filter((el) => regValue.test(el))[0].split(':')[1];
  }).replace(/ /g, '-') : null;
};
