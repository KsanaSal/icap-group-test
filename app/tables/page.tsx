"use client";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination/Pagination";

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
    const [filterCars, setFilterCars] = useState<Table[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);

    const totalCars = filterCars.length;
    const totalPages = Math.ceil(totalRecords / recordPerPage);
    const indexOfLastCar = currentPage * recordPerPage;
    const indexOfFirstCar = indexOfLastCar - recordPerPage;
    const currentCars = filterCars.slice(indexOfFirstCar, indexOfLastCar);

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

    useEffect(() => {
        getData();
    }, [currentPage, recordPerPage]);

    return (
        <main className="flex h-screen flex-col items-center p-24">
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
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalPages={totalPages}
                setRecordPerPage={setRecordPerPage}
                recordPerPage={recordPerPage}
            />
        </main>
    );
}
