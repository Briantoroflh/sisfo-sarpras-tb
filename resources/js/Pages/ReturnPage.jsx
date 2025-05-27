import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import RedButton from "../components/RedButton";
import GreenButton from "../components/GreenButton";

export default function ReturnPage() {
    const [returns, setReturns] = useState();
    const titleTable = <h2 className="font-medium">Pinjaman</h2>;
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/"; // Redirect to login if token does not exist
    }

    const getAllReturn = async () => {
        await axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/return",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            if(response.status === 200){
                setReturns(response.data.data)
            }
        });
    }

    const columns = [
        {
            name: "Gambar",
            selector: (row) => row.img,
            cell: (row) => (
                <img
                    src={`storage/${row.img}`}
                    className="w-16 h-16 p-1 object-cover rounded-md"
                />
            ),
            sortable: true,
        },
        {
            name: "Deskripsi",
            selector: (row) => row.desc,
            sortable: true,
        },
        {
            name: "Pengguna",
            selector: (row) => row.user,
            sortable: true,
        },
        {
            name: "Barang",
            selector: (row) => row.item,
            sortable: true,
        },
        {
            name: "Tanggal",
            selector: (row) => row.tgl,
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
                        className={`text-white px-2 py-1 rounded font-semibold text-sm ${colorClass}`}
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

    const data = Array.isArray(returns)
        ? returns.map((ret) => ({
              id: ret.id,
              img: ret.image,
              desc: ret.description,
              user: ret.user,
              item: ret.item,
              tgl: ret.date_returned,
              status: ret.status,
          }))
        : [];

    useEffect(() => {
        getAllReturn();
    }, []);

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
                        //onSelectedRowsChange={handleRowSelected}
                        pagination
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}
