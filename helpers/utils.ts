export const capitalize = (str: string): string => {
  return str[0].toUpperCase() + str.split('').splice(1, str.length).join('')
}

export const getRandomValue = (max: number) => {
  return Math.floor(Math.random() * max);
}

export const changeWord = (
  condition: boolean,
  wordIfFalse: string,
  wordIfTrue: string
): string => {
  return condition ? wordIfTrue : wordIfFalse
}