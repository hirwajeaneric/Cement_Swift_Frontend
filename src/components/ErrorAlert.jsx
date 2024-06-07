/* eslint-disable react/prop-types */
const ErrorAlert = ({ error }) => {
    return (
        <div role="alert" className="rounded border-s-4 border-red-500 bg-red-200 p-4 w-full">
            <strong className="block font-medium text-red-800"> {error.title} </strong>
            <p className="mt-2 text-sm text-red-700">{error.description}</p>
        </div>
    )
}

export default ErrorAlert