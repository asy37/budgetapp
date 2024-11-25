export const getDataFromStorage = (key: string) => {
  if (typeof window === 'undefined') {
    console.warn(
      `Attempting to use localStorage on the server for key "${key}"`
    )
    return null
  }

  try {
    const storedData = localStorage.getItem(key)
    if (storedData) {
      return JSON.parse(storedData)
    }
  } catch (error) {
    console.error(
      `Error parsing JSON from localStorage for key "${key}":`,
      error
    )
  }

  return null
}

export const setDataToStorage = <T>(key: string, data: T): void => {
  if (typeof window === 'undefined') {
    console.warn(
      `Attempting to use localStorage on the server for key "${key}"`
    )
    return
  }
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Error saving JSON to localStorage for key "${key}":`, error)
  }
}

export const removeDataFromStorage = (id: string): void => {
  if (typeof window === 'undefined') {
    console.warn(`Attempting to use localStorage on the server for key "${id}"`)
    return
  }

  try {
    localStorage.removeItem(id)
  } catch (error) {
    console.error(`Error removing localStorage key "${id}":`, error)
  }
}
