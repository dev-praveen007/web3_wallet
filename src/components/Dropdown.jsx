import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IoMdArrowDropdown } from "react-icons/io";
import { GrCheckboxSelected } from "react-icons/gr";


const Dropdown = ({ data, selectedData, onSelect }) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="px-4 py-2 bg-blue-600 text-white rounded-md flex flex-row justify-center items-center gap-2">
                {selectedData} <IoMdArrowDropdown size={20} />
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="mt-2 w-100 bg-white border rounded-lg shadow-lg" >
                {data?.length != 0 && data?.map((val,index) => {
                    return (
                        <DropdownMenu.Item onClick={() => onSelect(val,index)} className={`px-4 py-2 w-full hover:bg-gray-100 text-black ${selectedData === val?.label ? "bg-blue-100" : ""} flex flex-row justify-center items-center gap-2`}>
                            {val?.label} {selectedData === val?.label ? <GrCheckboxSelected /> : <></>}
                        </DropdownMenu.Item>
                    )
                })}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default Dropdown;
