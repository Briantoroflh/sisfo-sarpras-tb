import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DataTable from "react-data-table-component";
import Button2 from "../components/Button2";
import axios from "axios";
import { toast } from "react-toastify";

export default function CategoryPage() {
    const baseurl = "http://127.0.0.1:8000/api";
    const [category, setCategory] = useState();
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [id, setId] = useState(null);
    const titleTable = <h2 className="font-medium">Kategori</h2>;
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/"; // Redirect to login if token does not exist
    }

    const getAllCategory = async () => {
        await axios({
            method: "GET",
            url: `${baseurl}/category-items`,
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            if (response.status === 200) {
                setCategory(response.data.data);
            }
        });
    };

    const createCategory = async () => {
        try {
            await axios({
                method: "POST",
                url: `${baseurl}/category-items`,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
                data: {
                    category_name: categoryName,
                },
            }).then((response) => {
                if (response.status === 201) {
                    const { message } = response.data;

                    toast.success(message);
                    resetText();
                    getAllCategory();
                }
            });
        } catch (error) {
            if (error.response && error.response.data) {
                const msg = error.response.data.message;
                toast.error(msg); // ❌ Notifikasi error
            } else {
                toast.error(
                    "Terjadi kesalahan jaringan atau server tidak merespons."
                );
            }
        }
    };

    const updateCategory = async () => {
        try {
            await axios({
                method: "PUT",
                url: `${baseurl}/category-items/` + id,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
                data: {
                    category_name: categoryName,
                },
            }).then((response) => {
                if (response.status === 200) {
                    const { message } = response.data;

                    toast.success(message);
                    resetText();
                    getAllCategory();
                }
            });
        } catch (error) {
            if (error.response && error.response.data) {
                const msg = error.response.data.message;
                toast.error(msg); // ❌ Notifikasi error
            } else {
                toast.error(
                    "Terjadi kesalahan jaringan atau server tidak merespons."
                );
            }
        }
    };

    const deleteCategory = async () => {
        const idToDelete = selectedRows[0].id;

        try {
            await axios({
                method: "DELETE",
                url: `${baseurl}/category-items/` + idToDelete,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            }).then((response) => {
                if (response.status === 200) {
                    const { message } = response.data;

                    toast.success(message);
                    getAllCategory();
                }
            });
        } catch (error) {
            if (error.response && error.response.data) {
                const msg = error.response.data.message;
                toast.error(msg); // ❌ Notifikasi error
            } else {
                toast.error(
                    "Terjadi kesalahan jaringan atau server tidak merespons."
                );
            }
        }
    };

    const handleRowSelected = React.useCallback((state) => {
        setSelectedRows(state.selectedRows);
    }, []);

    const handelCreate = async (e) =>{
        e.preventDefault();
        await createCategory();
    }

    const handleUpdate = async (e) =>{
        e.preventDefault();
        await updateCategory();
    }

    const resetText = () => {
        setCategoryName("");
    };

    const handleRowClick = (row) => {
        setId(row.id);
        console.log(row.id);
        setCategoryName(row.name);
    };

    const columns = [
        {
            name: "Nama Kategori",
            selector: (row) => row.name,
            sortable: true,
        }
    ];

    const data = Array.isArray(category)
        ? category.map((cate) => ({
              id: cate.id,
              name: cate.category_name,
          }))
        : [];

    const contextActions = React.useMemo(() => {
        const handleDelete = () => {
            deleteCategory();
            setToggleCleared(!toggleCleared);
        };
        return <Button2 onClick={handleDelete} text={"Delete"} />;
    }, [data, selectedRows, toggleCleared]);

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <DashboardLayout>
            <div className="p-8">
                <div>
                    <h2 className="font-medium text-2xl">Dashboard</h2>
                    <p className="text-xs text-neutral-400">
                        Melihat dan menambahkan data kategori
                    </p>
                </div>
                <div className="flex justify-end items-center w-full mt-3">
                    <input
                        type="text"
                        placeholder="Masukan nama kategori"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 mt-2 w-100"
                    />
                    <Button2 text={"Tambah"} onClick={handelCreate} />
                    <Button2 text={"Edit"} onClick={handleUpdate} />
                </div>
                <div className="mt-2 bg-neutrak-200 shadow-xl/20 rounded-md p-5 ">
                    <DataTable
                        title={titleTable}
                        columns={columns}
                        data={data}
                        keyField="id"
                        selectableRows
                        contextActions={contextActions}
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={toggleCleared}
                        onRowClicked={handleRowClick}
                        pagination
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}
