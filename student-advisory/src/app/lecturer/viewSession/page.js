import ViewReport from "@/components/viewSession";

export default function viewSession() {
    return (
        <div className="flex-1 overflow-auto relative z-10 mt-6">
            <main className="max-w-7xl m-auto py:4 lg:px-8">
                <div>
                    <ViewReport />
                </div>

            </main>

        </div>
    )
}