
export function Card(
    {
        title,
        information,
        // children
    }: {
        title: string,
        information: number
        // children: React.ReactNode
    }
) {
    return (
        <div className="bg-gray-300 shadow-md p-4 rounded-md w-1/3">
            <h2 className="text-base font-semibold">{title}</h2>
            <p className="text-2xl font-bold">{information}</p>
            {/* {children} */}
        </div>
    )
}