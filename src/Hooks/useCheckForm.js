export function useCheckForm() {
    return function (e) {
        const form = document.querySelector(e.target)
        console.log(form)
    }
}