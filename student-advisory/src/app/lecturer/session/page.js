import CreateSessionPage from "@/components/createSession";


export default function SessionPage() {
    return (
        <div className="flex-1 overflow-auto relative z-10 mt-10">
            <main className="max-w-7xl m-auto py:4 lg:px-8">
                <div>
                    <CreateSessionPage />
                </div>

            </main>

        </div>
    )
}