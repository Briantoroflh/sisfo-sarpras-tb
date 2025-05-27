import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DataTable from "react-data-table-component";
import Button2 from "../components/Button2";
import Dropdown from "../components/Dropdown";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../components/Button2";

export default function UserPage() {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [selected, setSelected] = useState("");
    const [user, setUser] = useState();
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [clas, setClass] = useState("");
    const [major, setMajor] = useState("");
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const titleTable = <h2 className="font-medium">Pengguna</h2>;
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/"; // Redirect to login if token does not exist
    }

    const handleRowSelected = React.useCallback((state) => {
        setSelectedRows(state.selectedRows);
    }, []);

    const resetText = () => {
        setName("");
        setEmail("");
        setPassword("");
        setSelected("");
        setClass("");
        setMajor("");
    };

    const dataDropDown = [
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" },
    ];

    const columns = [
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Password",
            selector: (row) => row.password,
            sortable: true,
        },
        {
            name: "Role",
            selector: (row) => row.role,
            sortable: true,
        },
        {
            name: "Kelas",
            selector: (row) => row.class,
            sortable: true,
        },
        {
            name: "Jurusan",
            selector: (row) => row.major,
            sortable: true,
        },
    ];

    const data = Array.isArray(user)
        ? user.map((users) => ({
              id: users.id_user,
              name: users.name,
              email: users.email,
              password: users.password,
              role: users.role,
              class: users.class,
              major: users.major,
          }))
        : [];

    const handleRowClick = (row) => {
        setId(row.id);
        console.log(row.id);
        setName(row.name);
        setEmail(row.email);
        setPassword(row.password);
        setSelected(row.role);
        setClass(row.class);
        setMajor(row.major);
    };

    const contextActions = React.useMemo(() => {
        const handleDelete = () => {
            handleDeleteRow();
            setToggleCleared(!toggleCleared);
        };
        return <Button onClick={handleDelete} text={"Delete"} />;
    }, [data, selectedRows, toggleCleared]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios({
                method: "POST",
                url: "http://127.0.0.1:8000/api/users",
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
                data: {
                    name: name,
                    email: email,
                    password: password,
                    role: selected?.value,//basir nigga xixixixixixi
                    class: clas,
                    major: major,
                },
            }).then((response) => {
                if (response.status === 201) {
                    const { message } = response.data;

                    toast.success(message);
                    resetText();
                    getUsers();
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

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios({
                method: "PUT",
                url: "http://127.0.0.1:8000/api/users/" + id,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
                data: {
                    name: name,
                    email: email,
                    password: password,
                    role: selected?.value,
                    class: clas,
                    major: major,
                },
            }).then((response) => {
                if (response.status === 200) {
                    const { message } = response.data;

                    toast.success(message);
                    resetText();
                    getUsers();
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

    const handleDeleteRow = async () => {
        const idToDelete = selectedRows[0].id;

        try {
            await axios({
                method: "DELETE",
                url: "http://127.0.0.1:8000/api/users/" + idToDelete,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            }).then((response) => {
                if (response.status === 200) {
                    const { message } = response.data;

                    toast.success(message);
                    getUsers();
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

    const getUsers = async () => {
        await axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/users",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            if (response.status === 200) {
                setUser(response.data.data);
            }
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <DashboardLayout>
            <div className="p-8">
                <div>
                    <h2 className="font-medium text-2xl">Dashboard</h2>
                    <p className="text-xs text-neutral-400">
                        Melihat dan menambahkan data pengguna
                    </p>
                </div>
                <div className="grid grid-cols-2 justify-items-center p-3">
                    <div className="flex flex-col">
                        <label htmlFor="">Nama</label>
                        <input
                            type="text"
                            placeholder="Masukan nama"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mt-2 w-100"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            placeholder="Masukan email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mt-2 w-100"
                        />
                    </div>
                    <div className="mt-4">
                        <Dropdown
                            label="Role"
                            options={dataDropDown}
                            value={selected}
                            onChange={setSelected}
                            placeholder="Pilih role"
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="">Password</label>
                        <input
                            type="text"
                            placeholder="Masukan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mt-2 w-100"
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="">Kelas</label>
                        <input
                            type="text"
                            placeholder="Masukan kelas (Optional)"
                            value={clas}
                            onChange={(e) => setClass(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mt-2 w-100"
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="">Jurusan</label>
                        <input
                            type="text"
                            placeholder="Masukan jurusan (Optional)"
                            value={major}
                            onChange={(e) => setMajor(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mt-2 w-100"
                        />
                    </div>
                </div>
                <div className="mx-187 flex ">
                    <Button2 text={"Tambah"} onClick={handleSubmit} />
                    <Button2 text={"Edit"} onClick={handleUpdate} />
                </div>
                <div className="mt-4 bg-neutrak-200 shadow-xl/20 rounded-md p-5 ">
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
