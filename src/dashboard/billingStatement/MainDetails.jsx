export default function MainDetails( first_name, last_name, address ) {
    return (
        <>
            <section className="flex flex-col items-end justify-end">
                <h2 className="font-bold text-xl uppercase md:text-4xl">{first_name} {last_name}</h2>
                <p>{address}</p>
            </section>
        </>
    )
}