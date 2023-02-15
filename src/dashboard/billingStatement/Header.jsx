export default function Header({handlePrint}) {
    return (
        <>
            <header className="flex flex-col items-center justify-center mb-5 xl:flex-row xl:justify-center">
                <div>
                    <h1 className="font-bold uppercase tracking-wide text-4xl mb-3">Invoice</h1>
                </div>
                <div>
                    <ul className="flex items-center justify-between flex-wrap">
                        <li><button onClick={handlePrint} className="btn btn-print">Print</button></li>
                        <li><button>Download</button></li>
                        <li><button>Send</button></li>    
                    </ul>
                </div>
            </header>
        </>
    )
}