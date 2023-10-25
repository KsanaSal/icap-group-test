"use client";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination/Pagination";
import DropDown from "../components/dropDown/DropDown";
import DeleteModal from "../components/modals/DeleteModal";
import AddEditModal from "../components/modals/AddEditModal";
import Image from "next/image";
import Mem from "../assets/images/mem-js.jpg";
import MemTwo from "../assets/images/mem-full-stack.jpg";

interface Table {
    id: number;
    name: string;
    email: string;
    birthday_date: string;
    phone_number: string;
    address: string;
}
export default function Tables() {
    const [table, setTable] = useState<Table[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [mode, setMode] = useState<"add" | "edit">("add");
    const [currentRecordId, setCurrentRecordId] = useState(0);

    const totalPages = Math.ceil(totalRecords / recordPerPage);

    const deleteHandler = (recordId: number) => {
        setCurrentRecordId(recordId);
        setIsDeleteModalOpen(true);
    };
    const editHandler = (recordId: number) => {
        setCurrentRecordId(recordId);
        setIsAddEditModalOpen(true);
        setMode("edit");
    };

    useEffect(() => {
        const getData = async () => {
            fetch(
                `https://technical-task-api.icapgroupgmbh.com/api/table/?name=&email=&phone_number=&address=&limit=${recordPerPage}&offset=${
                    (currentPage - 1) * recordPerPage
                }`
            )
                .then((res) => res.json())
                .then((res) => {
                    setTable(res.results);
                    setTotalRecords(res.count);
                });
        };

        getData();
    }, [currentPage, recordPerPage]);

    return (
        <main className="flex h-screen flex-col items-center p-24">
            <div className="flex items-end justify-end w-full">
                <button
                    onClick={() => {
                        setIsAddEditModalOpen(true);
                        setMode("add");
                    }}
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm sm:text-base lg:text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add car
                </button>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block w-screen py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden ring-1 ring-black ring-opacity-5 sm:rounded-lg shadow-lg shadow-emerald-900">
                            <table className="w-full divide-y divide-gray-300">
                                <thead className="bg-lime-50">
                                    <tr className="text-sm sm:text-base lg:text-lg font-semibold">
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-gray-900 sm:pl-6"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-gray-900"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-gray-900"
                                        >
                                            Birthday date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-gray-900"
                                        >
                                            Phone number
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-gray-900"
                                        >
                                            Address
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-gray-900"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {table &&
                                        table.map((tab) => (
                                            <tr
                                                key={tab.id}
                                                className="text-xs sm:text-sm lg:text-base"
                                            >
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 font-medium text-gray-900 sm:pl-6">
                                                    {tab.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-gray-700">
                                                    {tab.email}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-gray-700">
                                                    {tab.birthday_date}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-gray-700">
                                                    {tab.phone_number}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-gray-700">
                                                    {tab.address}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <DropDown
                                                        recordId={tab.id}
                                                        deleteHandler={
                                                            deleteHandler
                                                        }
                                                        editHandler={
                                                            editHandler
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {totalPages > 1 && (
                <Pagination
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setRecordPerPage={setRecordPerPage}
                    recordPerPage={recordPerPage}
                />
            )}
            <DeleteModal
                recordId={currentRecordId}
                isModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
            />
            <AddEditModal
                recordId={currentRecordId}
                isModalOpen={isAddEditModalOpen}
                setIsModalOpen={setIsAddEditModalOpen}
                mode={mode}
            />
            <div className="flex items-start justify-center mt-[250px] gap-5">
                <Image
                    src={MemTwo}
                    alt="mem-js"
                    width={500}
                    height={500}
                    className="object-cover rounded-[10px]"
                />
                <Image
                    src={Mem}
                    alt="mem-js"
                    width={500}
                    height={500}
                    className="object-cover rounded-[10px]"
                />
            </div>
        </main>
    );
}
