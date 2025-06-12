export function Button({ text, onClick }) {
    return (
        <button className="btn btn-primary" onClick={onClick}>
            {
                text
            }
        </button>
    )
}