"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialFormData = {
    userName: "",
    password: "",
};

export default function Home() {
    const [formData, setFormData] = useState(initialFormData);
    const router = useRouter();
    const [showError, setShowError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "https://technical-task-api.icapgroupgmbh.com/api/login/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        password: formData.password,
                        username: formData.userName,
                    }),
                }
            );
            if (response.status === 200) {
                response.json().then((data) => {
                    router.push("/tables");
                });
            } else if (response.status === 401) {
                setShowError(true);
            } else {
                console.error("An error occurred during registration");
            }
        } catch (error) {
            console.error(
                "An error occurred while sending data to the server",
                error
            );
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowError(false);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <main className="flex min-h-screen flex-col items-end justify-center p-24">
            <div className="flex flex-col gap-5 items-center bg-emerald-200 rounded-[24px] p-10 shadow-lg shadow-emerald-900 relative">
                <h1 className="text-[56px]">Sign in</h1>
                {showError && (
                    <p className="text-xl text-red-500 absolute top-[118px]">
                        Incorrect username or password!
                    </p>
                )}
                <form
                    className="flex flex-col gap-6 text-3xl w-[550px]"
                    onSubmit={handleSubmit}
                >
                    <label className="flex flex-col gap-2">
                        User name
                        <input
                            type="text"
                            name="userName"
                            className="text-2xl px-3 py-2 rounded-lg border-2 border-emerald-900 w-full focus:shadow-lg focus:shadow-emerald-900 focus:border-emerald-300 focus:scale-105 bg-slate-100"
                            placeholder="Enter your name"
                            autoComplete="off"
                            value={formData.userName}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label className="flex flex-col gap-2">
                        Password
                        <input
                            type="password"
                            name="password"
                            className="text-2xl px-3 py-2 rounded-lg border-2 border-emerald-900 w-full focus:shadow-lg focus:shadow-emerald-900 focus:border-emerald-300 focus:scale-105 bg-slate-100"
                            placeholder="Enter your password"
                            autoComplete="off"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </label>

                    <button
                        type="submit"
                        className={` px-6 py-3 rounded-lg w-[250px] text-2xl text-white  hover:scale-105 transition-all ${
                            formData.userName && formData.password
                                ? "hover:bg-emerald-700 bg-emerald-600"
                                : "bg-emerald-300 cursor-not-allowed"
                        }`}
                        disabled={!formData.userName || !formData.password}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </main>
    );
}
