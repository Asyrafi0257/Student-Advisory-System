import ViewMentee from "@/components/viewStudent";

export default function ViewStudentPage() {
    return (
        <div className="flex-1 overflow-auto relative z-10 mt-6">
            <main className="max-w-7xl m-auto py:4 lg:px-8">
                <div>
                    <ViewMentee />
                </div>

            </main>

        </div>
    )
}