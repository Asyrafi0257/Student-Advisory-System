import Image from "next/image";

export default function Upload() {
    return(
        <div className="bg-[#ffffff] rounded-xl shadow-md p-4 md:p-6 mx-8 h-[300px]">
            <div className="flex border-b border-gray-300 mb-5">
                <h2 className="font-semibold text-[24px]">Upload Files</h2>
            </div>
            <div className="flex flex-col justify-center items-center w-full h-[200px] border-3 border-dashed border-blue-300 rounded-xl cursor-pointer">
                <Image 
                    src="/images/upload-file.png"
                    alt="upload-file.png"
                    width={100}
                    height={100}
                    priority
                />
                <p className="mt-3"> <span className="text-blue-600">Click here</span> to upload your file or drag.</p>
                <p className="text-gray-400 mt-3">Supported Format : xlsx, xls (10 mb each)</p>
            </div>

           
        </div>
    )
}