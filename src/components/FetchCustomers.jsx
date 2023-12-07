export const fetchCustomers = () => {
    return fetch(import.meta.env.VITE_API_URL + '/api/customers')
      .then((response) => {
        if (!response.ok)
          throw new Error("Something went wrong: " + response.statusText)
        return response.json()
      })
      .catch(error => console.error("Error fetching trainings:", error))
  }