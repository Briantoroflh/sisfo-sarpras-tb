import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DataTable from "react-data-table-component";
import Button2 from "../components/Button2";
import axios from "axios";
import RedButton from "../components/RedButton";
import GreenButton from "../components/GreenButton";
import { toast } from "react-toastify";

export default function BorrowedPage() {
    const [borrowed, setBorrowed] = useState();
    const titleTable = <h2 className="font-medium">Pinjaman</h2>;
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/"; // Redirect to login if token does not exist
    }

    const getAllBorrowed = async () => {
        await axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/borrowed",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            },
        }).then((response) => {
            if(response.status === 200) {
                setBorrowed(response.data.data)
            }
        });
    }

    const approve = async (id) => {
        await axios({
            method: "PUT",
            url: `http://127.0.0.1:8000/api/borrowed/${id}/approved`,
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            if(response.status === 200){
                const {message} = response.data

                toast.success(message);
                getAllBorrowed();
            }
        });
    }

    const reject = async (id) => {
        await axios({
            method: "PUT",
            url: `http://127.0.0.1:8000/api/borrowed/${id}/reject`,
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            if(response.status === 200){
                const {message} = response.data

                toast.success(message);
                getAllBorrowed();
            }
        });
    }

    const columns = [
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Barang",
            selector: (row) => row.item,
            sortable: true,
        },
        {
            name: "Dari Tanggal",
            selector: (row) => row.date_borrowed,
            sortable: true,
        },
        {
            name: "Sampai Tanggal",
            selector: (row) => row.due_date,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            cell: (row) => {
                let colorClass = "";
                switch (row.status) {
                    case "approved":
                        colorClass =
                            "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-green-400 border border-green-400";
                        break;
                    case "reject":
                        colorClass =
                            "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-red-400 border border-red-400";
                        break;
                    case "pending":
                        colorClass =
                            "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300";
                        break;
                    default:
                        colorClass = "bg-gray-400";
                }

                return (
                    <span
                        className={`${colorClass}`}
                    >
                        {row.status}
                    </span>
                );
            },
            sortable: true,
        },
        {
            name: "Aksi",
            selector: (row) => row.action,
            sortable: true,
            button: true,
            cell: (row) => {
                if (row.status === "pending") {
                    return (
                        <div className="flex gap-5">
                            <RedButton onClick={() => reject(row.id)} />
                            <GreenButton onClick={() => approve(row.id)} />
                        </div>
                    );
                } else {
                    return (
                        <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-green-400 border border-green-400">
                            Done!
                        </span>
                    );
                }
            },
        },
    ];

    const data = Array.isArray(borrowed)
        ? borrowed.map((bor) => ({
              id: bor.id,
              name: bor.users,
              item: bor.item,
              date_borrowed: bor.borrowed_date,
              due_date: bor.due_date,
              status: bor.status
          }))
        : [];

    useEffect(() => {
        getAllBorrowed();
    }, [])

    return (
        <DashboardLayout>
            <div className="p-8">
                <div>
                    <h2 className="font-medium text-2xl">Dashboard</h2>
                    <p className="text-xs text-neutral-400">
                        Melihat semua peminjaman
                    </p>
                </div>
                <div className="mt-2 bg-neutrak-200 shadow-xl/20 rounded-md p-5 ">
                    <DataTable
                        title={titleTable}
                        columns={columns}
                        data={data}
                        keyField="id"
                        selectableRows
                        pagination
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}
