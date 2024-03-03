import { showToast } from './Toast'

export default function ServerErrorToast({ error }) {
    const err = error ? Object.keys(error.data).map((fieldName) => error.data[fieldName][0]) : null
    return (
        showToast('error', 'Opps!', err || null)
    )
}
