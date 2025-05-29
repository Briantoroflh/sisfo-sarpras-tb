import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";
import { toast } from "react-toastify";
import Button2 from "../components/Button2";
import DataTable from "react-data-table-component";
import Dropdown from "../components/Dropdown";

export default function ItemsPage() {
    const baseurl = "http://127.0.0.1:8000/api";
    const [items, setItems] = useState();
    const [id, setId] = useState(null);
    const [itemName, setItemName] = useState("");
    const [itemImage, setItemImage] = useState(null);
    const [itemCode, setItemCode] = useState("");
    const [itemCategory, setItemCategory] = useState("");
    const [itemStock, setItemStock] = useState("");
    const [itemBrand, setItemBrand] = useState("");
    const [dataDropDown, setDataDropDown] = useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const fileInputRef = useRef(null);
    const titleTable = <h2 className="font-medium">Barang</h2>;
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/"; // Redirect to login if token does not exist
    }

    const handleRowSelected = React.useCallback((state) => {
        setSelectedRows(state.selectedRows);
    }, []);

    const resetText = () => {
        setItemName("");
        setItemBrand("");
        setItemCategory("");
        setItemImage(null);
        setItemStock("");
        setItemCode("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setItemImage(file); // langsung simpan file-nya, bukan URL string
        }
    };

    const handleRowClick = (row) => {
        setId(row.id);
        setItemName(row.name);
        setItemBrand(row.brand);
        const selectedCategory = dataDropDown.find(
            (cat) => cat.label === row.category
        );
        setItemCategory(selectedCategory || null);
        setItemImage(row.image);
        setItemStock(row.stock);
        setItemCode(row.code);
    };

    const columns = [
        {
            name: "Gambar",
            selector: (row) => row.image,
            cell: (row) => (
                <img
                    src={`storage/${row.image}`}
                    alt={row.name}
                    className="w-16 h-16 p-1 object-cover rounded-md"
                />
            ),
            sortable: true,
        },
        {
            name: "Nama Barang",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Kode Barang",
            selector: (row) => row.code,
            sortable: true,
        },
        {
            name: "Kategori",
            selector: (row) => row.category,
            sortable: true,
        },
        {
            name: "Brand",
            selector: (row) => row.brand,
            sortable: true,
        },
        {
            name: "Stok",
            selector: (row) => row.stock,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            cell: (row) => (
                <span
                    className={`text-white px-2 py-1 rounded font-semibold text-sm ${
                        row.status === "unused" ? "bg-green-500" : "bg-red-400"
                    }`}
                >
                    {row.status}
                </span>
            ),
            sortable: true,
        },
        {
            name: "Kondisi",
            selector: (row) => row.condition,
            cell: (row) => (
                <span
                    className={`text-white px-2 py-1 rounded font-semibold text-sm ${
                        row.condition === "good" ? "bg-green-500" : "bg-red-400"
                    }`}
                >
                    {row.condition}
                </span>
            ),
            sortable: true,
        },
    ];

    const data = Array.isArray(items)
        ? items.map((item) => ({
              id: item.id,
              image: item.item_image,
              name: item.item_name,
              code: item.code_item,
              category: item.category,
              brand: item.brand,
              stock: item.stock,
              status: item.status,
              condition: item.item_condition,
          }))
        : [];

    const contextActions = React.useMemo(() => {
        const handleDelete = () => {
            deleteItems();
            setToggleCleared(!toggleCleared);
        };
        return <Button2 onClick={handleDelete} text={"Delete"} />;
    }, [data, selectedRows, toggleCleared]);

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
                const options = response.data.data.map((item) => ({
                    value: item.id,
                    label: item.category_name,
                }));
                setDataDropDown(options);
            }
        });
    };

    const getAllItems = async () => {
        await axios({
            method: "GET",
            url: `${baseurl}/items`,
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            if (response.status === 200) {
                setItems(response.data.data);
            }
        });
    };

    const createItems = async () => {
        try {
            await axios({
                method: "POST",
                url: `${baseurl}/items`,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data",
                },
                data: {
                    item_name: itemName,
                    item_image: itemImage,
                    code_items: itemCode,
                    id_category: itemCategory?.value,
                    stock: itemStock,
                    brand: itemBrand,
                },
            }).then((response) => {
                if (response.status === 201) {
                    const { message } = response.data;

                    getAllItems();
                    toast.success(message);
                    resetText();
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

    const updateItems = async () => {
        try {
            await axios({
                method: "PUT",
                url: `${baseurl}/items/` + id,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data",
                },
                data: {
                    item_name: itemName,
                    item_image: itemImage,
                    code_items: itemCode,
                    id_category: itemCategory?.value,
                    stock: itemStock,
                    brand: itemBrand,
                },
            }).then((response) => {
                if (response.status === 200) {
                    const { message } = response.data;

                    getAllItems();
                    toast.success(message);
                    resetText();
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

    const deleteItems = async () => {
        const idToDelete = selectedRows[0].id;

        try {
            await axios({
                method: "DELETE",
                url: `${baseurl}/items/` + idToDelete,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            }).then((response) => {
                if (response.status === 200) {
                    const { message } = response.data;

                    getAllItems();
                    toast.success(message);
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

    const handleCreate = async () => {
        await createItems();
    };

    const handleUpdate = async () => {
        await updateItems();
    };

    useEffect(() => {
        getAllItems();
        getAllCategory();
    }, []);

    return (
        <DashboardLayout>
            <div className="p-8">
                <div>
                    <h2 className="font-medium text-2xl">Dashboard</h2>
                    <p className="text-xs text-neutral-400">
                        Melihat dan menambahkan data barang
                    </p>
                </div>
                <div className="grid grid-cols-2 justify-items-center p-3">
                    <div className="flex flex-col">
                        <label htmlFor="">Nama Barang</label>
                        <input
                            type="text"
                            placeholder="Masukan nama barang"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mt-2 w-100"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">Kode Barang</label>
                        <input
                            type="text"
                            placeholder="Masukan kode barang"
                            value={itemCode}
                            onChange={(e) => setItemCode(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mt-2 w-100"
                        />
                    </div>
                    <div className="mt-4">
                        <Dropdown
                            label="Kategori"
                            options={dataDropDown}
                            value={itemCategory}
                            onChange={(val) => setItemCategory(val)}
                            placeholder="Pilih kategori"
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="">Gambar</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e)}
                            className="border border-gray-300 rounded-md p-2 mt-2 w-100"
                            ref={fileInputRef}
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="">Stok</label>
                        <input
                            type="number"
                            placeholder="Masukan stok"
                            value={itemStock}
                            onChange={(e) => setItemStock(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mt-2 w-100"
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="">Brand</label>
                        <input
                            type="text"
                            placeholder="Masukan nama brand"
                            value={itemBrand}
                            onChange={(e) => setItemBrand(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mt-2 w-100"
                        />
                    </div>
                </div>
                <div className="mx-215 flex ">
                    <Button2 text={"Tambah"} onClick={handleCreate} />
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
