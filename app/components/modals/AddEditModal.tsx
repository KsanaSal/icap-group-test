import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface IProps {
    recordId: number;
    isModalOpen: boolean;
    setIsModalOpen: (e: boolean) => void;
    mode: "add" | "edit";
}

const AddEditModal = ({
    mode,
    recordId,
    isModalOpen,
    setIsModalOpen: setIsModalOpen,
}: IProps) => {
    const [open, setOpen] = useState(isModalOpen);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birthdayDate, setBirthdayDate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [isVinUnique, setIsVinUnique] = useState(true);

    useEffect(() => {
        const validateForm = () => {
            const requiredFields = [
                name,
                email,
                birthdayDate,
                phoneNumber,
                address,
            ];
            const isFormValid = requiredFields.every((field) => field !== "");
            setIsFormValid(isFormValid);
        };
        validateForm();
    }, [name, email, birthdayDate, phoneNumber, address]);

    useEffect(() => {
        const getData = async () => {
            fetch(
                `https://technical-task-api.icapgroupgmbh.com/api/table/${recordId}/`
            )
                .then((res) => res.json())
                .then((res) => {
                    setName(res.name);
                    setEmail(res.email);
                    setBirthdayDate(res.birthday_date);
                    setPhoneNumber(res.phone_number);
                    setAddress(res.address);
                });
        };

        if (mode === "edit") {
            getData();
        }
    }, [recordId, mode]);

    const resetData = () => {
        setName("");
        setEmail("");
        setBirthdayDate("");
        setPhoneNumber("");
        setAddress("");
        setIsVinUnique(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
        setOpen(false);
    };

    useEffect(() => {
        setOpen(isModalOpen);
    }, [isModalOpen]);

    const handleAdd = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        try {
            const response = await fetch(
                "https://technical-task-api.icapgroupgmbh.com/api/table/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        birthday_date: birthdayDate,
                        phone_number: phoneNumber,
                        address: address,
                    }),
                }
            );
            if (response.ok) {
                resetData();
                hideModal();
            } else if (response.status === 400) {
                setIsVinUnique(false);
            } else {
                console.error("Something went wrong");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        try {
            const response = await fetch(
                `https://technical-task-api.icapgroupgmbh.com/api/table/${recordId}/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        birthday_date: birthdayDate,
                        phone_number: phoneNumber,
                        address: address,
                    }),
                }
            );

            if (response.ok) {
                resetData();
                hideModal();
            } else {
                console.error("Something went wrong");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => {
                    hideModal();
                    resetData();
                }}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="absolute right-0 sm:right-0 top-0 pr-4 pt-4 sm:block">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                                        onClick={() => {
                                            hideModal();
                                            resetData();
                                        }}
                                    >
                                        <XMarkIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-extrabold leading-6 text-indigo-700"
                                        >
                                            {mode === "edit"
                                                ? "Edit car"
                                                : "Add car"}
                                        </Dialog.Title>

                                        <div className="mt-2">
                                            <form
                                                className="flex flex-col gap-3 w-full sm:w-[450px]"
                                                onSubmit={(e) =>
                                                    mode === "edit"
                                                        ? handleEdit(e)
                                                        : handleAdd(e)
                                                }
                                            >
                                                <label className="flex flex-col sm:flex-row items-center sm:items-start gap-1 text-gray-900 font-semibold">
                                                    Name:
                                                    <input
                                                        className="text-sm font-normal w-60 py-1 px-2 border border-gray-200 rounded-md placeholder:text-gray-400"
                                                        type="text"
                                                        value={name}
                                                        placeholder="Birthday date"
                                                        onChange={(e) =>
                                                            setName(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </label>
                                                <label className="flex flex-col sm:flex-row items-center sm:items-start gap-1 text-gray-900 font-semibold">
                                                    Email:
                                                    <input
                                                        className="text-sm font-normal w-60 py-1 px-2 border border-gray-200 rounded-md placeholder:text-gray-400"
                                                        type="text"
                                                        value={email}
                                                        placeholder="Birthday date"
                                                        onChange={(e) =>
                                                            setEmail(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </label>
                                                <label className="flex flex-col sm:flex-row items-center sm:items-start gap-1 text-gray-900 font-semibold">
                                                    Birthday date:
                                                    <input
                                                        className="text-sm font-normal w-60 py-1 px-2 border border-gray-200 rounded-md placeholder:text-gray-400"
                                                        type="text"
                                                        value={birthdayDate}
                                                        placeholder="Birthday date"
                                                        onChange={(e) =>
                                                            setBirthdayDate(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </label>
                                                <label className="flex flex-col sm:flex-row items-center sm:items-start gap-1 text-gray-900 font-semibold">
                                                    Phone number:
                                                    <input
                                                        className="text-sm font-normal w-60 py-1 px-2 border border-gray-200 rounded-md placeholder:text-gray-400"
                                                        type="text"
                                                        value={phoneNumber}
                                                        placeholder="Phone number"
                                                        onChange={(e) =>
                                                            setPhoneNumber(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </label>
                                                <label className="flex flex-col sm:flex-row items-center sm:items-start gap-1 text-gray-900 font-semibold">
                                                    Address:
                                                    <input
                                                        className="text-sm font-normal w-60 py-1 px-2 border border-gray-200 rounded-md placeholder:text-gray-400"
                                                        type="text"
                                                        value={address}
                                                        placeholder="Phone number"
                                                        onChange={(e) =>
                                                            setAddress(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </label>

                                                <div className="mt-5 w-[240px] sm:w-full sm:mt-4 flex flex-col gap-2 sm:flex-row justify-center items-center sm:items-end sm:justify-end">
                                                    <button
                                                        type="button"
                                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-lime-300 hover:bg-lime-50 sm:mt-0 sm:w-auto"
                                                        onClick={() => {
                                                            hideModal();
                                                            resetData();
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={!isFormValid}
                                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 sm:ml-3 sm:w-auto disabled:bg-slate-300"
                                                    >
                                                        {mode === "edit"
                                                            ? "Update"
                                                            : "Add"}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default AddEditModal;
