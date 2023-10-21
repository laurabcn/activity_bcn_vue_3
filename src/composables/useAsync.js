import { ref, readonly } from 'vue'

export function useAsync() {
    const results = ref(null)
    const error = ref(null)

    const makeRequest = async (API_URL) => {
        try {
            const request = await (await fetch(API_URL)).json()
            results.value = request
        } catch (err) {
            console.log(err)
            error.value = err
        }
    }

    return {
        makeRequest,
        results: readonly(results),
        error,
    }
}
