import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

interface IProps {
    deleteHandler: (recordId: number) => void;
    editHandler: (recordId: number) => void;
    recordId: number;
}

const DropDown = ({ deleteHandler, editHandler, recordId }: IProps) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex items-center rounded-full bg-lime-50 text-gray-500 hover:text-gray-900 hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-5 bottom-2 z-10 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 flex flex-col items-center">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => editHandler(recordId)}
                                    className={`${
                                        active
                                            ? "bg-lime-100 text-gray-900"
                                            : "text-gray-700"
                                    } block px-4 py-2 text-sm w-full`}
                                >
                                    Edit
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => deleteHandler(recordId)}
                                    className={`${
                                        active
                                            ? "bg-lime-100 text-gray-900"
                                            : "text-gray-700"
                                    } block px-4 py-2 text-sm w-full`}
                                >
                                    Delete
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default DropDown;
