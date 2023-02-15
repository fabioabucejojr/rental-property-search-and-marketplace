export default function Footer(fname, lname, name, email, address, website) {
    return (
        <>
            <footer>
                <ul className="flex flex-wrap items-center justify-center">
                    <li><span className="font-bold">Your name:</span>{fname}</li>
                    <li><span className="font-bold">Your name:</span>{lname}</li>
                    <li><span className="font-bold">Your email: </span>{email}</li>
                    <li><span className="font-bold">Phone number: </span>{address}</li>
                    <li><span className="font-bold">Bank: </span>Bank Account Islands</li>
                    <li><span className="font-bold">Account holder: </span>{name}</li>
                    <li><span className="font-bold">Account number:</span></li>
                    <li><span className="font-bold">Website: </span><a href={website} target="_blank" rel="noopenner noreferrer">{website}</a></li>
                </ul>
            </footer>
        </>
    )
}