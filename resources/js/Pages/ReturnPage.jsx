import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import RedButton from "../components/RedButton";
import GreenButton from "../components/GreenButton";
import Button2 from "../components/Button2";

export default function ReturnPage() {
    const baseurl = "http://127.0.0.1:8000/api";
    const [returns, setReturns] = useState();
    const titleTable = <h2 className="font-medium">Pinjaman</h2>;
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/"; // Redirect to login if token does not exist
    }

    function convertArrayOfObjectsToCSV(array) {
        let result;

        const columnDelimiter = ",";
        const lineDelimiter = "\n";
        const keys = Object.keys(data[0]);

        result = "";
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach((item) => {
            let ctr = 0;
            keys.forEach((key) => {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];

                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
    function downloadCSV(array) {
        const link = document.createElement("a");
        let csv = convertArrayOfObjectsToCSV(array);
        if (csv == null) return;

        const filename = "Laporan-sisfo.csv";

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }

        link.setAttribute("href", encodeURI(csv));
        link.setAttribute("download", filename);
        link.click();
    }

    const Export = ({ onExport }) => (
        <Button2 onClick={(e) => onExport(e.target.value)} text={"Export"}>
            Export
        </Button2>
    );

    const getAllReturn = async () => {
        await axios({
            method: "GET",
            url: `${baseurl}/return`,
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            if (response.status === 200) {
                setReturns(response.data.data);
            }
        });
    };

    const approve = async (id) => {
        await axios({
            method: "PUT",
            url: `${baseurl}/return/${id}/approved`,
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            if (response.status === 200) {
                const { message } = response.data;

                toast.success(message);
                getAllReturn();
            }
        });
    };

    const reject = async (id) => {
        await axios({
            method: "PUT",
            url: `${baseurl}/return/${id}/reject`,
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            if (response.status === 200) {
                const { message } = response.data;

                toast.success(message);
                getAllReturn();
            }
        });
    };

    const columns = [
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

    // const data = Array.isArray(returns)
    //     ? returns.map((ret) => ({
    //           id: ret.id,
    //           desc: ret.description,
    //           user: ret.user,
    //           item: ret.item,
    //           tgl: ret.date_returned,
    //           status: ret.status,
    //       }))
    //     : [];

    const data = Array.isArray(returns)
        ? returns.map((ret) => ({
              id: ret.id,
              desc: ret.description,
              user: ret.borrowed?.users?.name || "-",
              item: ret.borrowed?.detailBorrow?.item?.item_name || "-",
              tgl: ret.date_returned,
              status: ret.status,
          }))
        : [];

    const actionsMemo = React.useMemo(
        () => <Export onExport={() => downloadCSV(data)} />,
        []
    );

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
                        actions={actionsMemo}
                        selectableRows
                        //onSelectedRowsChange={handleRowSelected}
                        pagination
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}
