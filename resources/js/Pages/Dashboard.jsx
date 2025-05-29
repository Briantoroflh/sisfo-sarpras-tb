import { useEffect, useState } from "react";
import Card from "../components/Card";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";
import DataTable from "react-data-table-component";
import React from "react";

export default function Dashboard() {
    const baseurl = "http://127.0.0.1:8000/api";
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/"; // Redirect to login if token does not exist
    }

    const [sum, setSum] = useState();
    const [logs, setLogs] = useState();
    const [selectedRows, setSelectedRows] = React.useState(false);
    const titleTable = <h2 className="font-medium">Riwayat Transaksi</h2>;

    const columns = [
        {
            name: "Pengguna",
            selector: (row) => row.username,
            sortable: true,
        },
        {
            name: "Keterangan",
            selector: (row) => row.description,
            sortable: true,
        },
    ];

    const data = Array.isArray(logs)
        ? logs.map((log) => ({
              id: log.id_log,
              username: log.name,
              description: log.description,
          }))
        : [];

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
        console.log("Selected Rows: ", selectedRows);
    };

    useEffect(() => {
        axios({
            method: "GET",
            url: `${baseurl}/dashboard-admin`,
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        }).then(function (response) {
            if (response.status === 200) {
                setSum(response.data.sum);
                setLogs(response.data.log);
            }
        });
    }, []);

    

    return (
        <DashboardLayout>
            <div className="p-8">
                <div>
                    <h2 className="font-medium text-2xl">Dashboard</h2>
                    <p className="text-xs text-neutral-400">
                        Melihat semua pinjaman dan pengembalian
                    </p>
                </div>
                <div className="mt-10 grid grid-cols-5 justify-items-center">
                    <Card
                        title={"Jumlah Pengguna"}
                        desc={`${sum?.sum_users ?? 0}`}
                    />
                    <Card
                        title={"Jumlah Kategori"}
                        desc={`${sum?.sum_categories ?? 0}`}
                    />
                    <Card
                        title={"Jumlah Barang"}
                        desc={`${sum?.sum_items ?? 0}`}
                    />
                    <Card
                        title={"Jumlah Peminjaman"}
                        desc={`${sum?.sum_borrowed ?? 0}`}
                    />
                    <Card
                        title={"Jumlah Pengembalian"}
                        desc={`${sum?.sum_return ?? 0}`}
                    />
                </div>
                <div className="mt-10 bg-neutrak-200 shadow-xl/20 rounded-md p-5 ">
                    <DataTable
                        title={titleTable}
                        columns={columns}
                        data={data}
                        keyField="id"
                        selectableRows
                        onSelectedRowsChange={handleChange}
                        pagination
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}
