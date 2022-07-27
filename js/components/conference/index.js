const Conference = () => {
    return (
        <div className="p-4 h-screen flex flex-row items-center justify-center space-x-4">
            <div className="w-72 h-72 shadow-xl rounded-lg shadow-xl flex flex-col p-5 space-y-2">
                <h4 className="font-bold text-logoColor">Links</h4>
                <hr />
                <ul>
                    <li><a target="_blank" href="https://meet.google.com/xbt-qmsr-gjr"> &rarr; SQL (Postgres)</a></li>
                    <li><a target="_blank" href="https://meet.google.com/xbt-qmsr-gjr"> &rarr; Java</a></li>
                    <li><a target="_blank" href="https://meet.google.com/xbt-qmsr-gjr"> &rarr; Python</a></li>
                    <li><a target="_blank" href="https://meet.google.com/xbt-qmsr-gjr"> &rarr; C++</a></li>
                </ul>
            </div>
            <div className="w-72 h-72 shadow-xl rounded-lg shadow-xl flex flex-col p-5 flex flex-col items-center justify-center space-y-4">
                <select className="w-full">
                    <option value="python" key="python">Python</option>
                    <option value="java" key="java">Java</option>
                    <option value="c++" key="c++">C++</option>
                    <option value="sql" key="sql">Sql</option>
                </select>
                <input type="text" placeholder="Value" className="w-full" />
                <input type="password" placeholder="Passphrase" className="w-full" />
                <button className="border p-2 hover:bg-black hover:text-white">Publish</button>
            </div>
        </div>
    )
}