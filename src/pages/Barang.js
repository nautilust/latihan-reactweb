import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {
  Alert,
  Table,
  Button,
  Modal,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { FaPlus, FaSync, FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";

function Barang() {
  let history = useHistory();
  let apiUrl = "http://backendpkl.spacearts.id/api";

  const [data, setData] = useState();
  const [dataId, setDataId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  function toastMsgHandler(status, typeMsg, msg) {
    let msgString = toString(msg);

    if (status === true) {
      if (typeMsg === "refresh") {
        setToastMsg("Berhasil memperbarui data barang!");
        setToastShow(true);
        setDisabled(false);
      } else if (typeMsg === "delete") {
        setToastMsg("Berhasil menghapus data barang!");
        setToastShow(true);
        setDisabled(false);
      } else {
        return;
      }
    } else {
      if (typeMsg === "refresh") {
        setToastMsg("Gagal memperbarui data barang! Alasan: " + msgString);
        setToastShow(true);
        setDisabled(false);
      } else if (typeMsg === "delete") {
        setToastMsg("Gagal menghapus data barang! Alasan: " + msgString);
        setToastShow(true);
        setDisabled(false);
      } else {
        return;
      }
    }
  }

  function handleModalClose() {
    setDataId("");
    setModalShow(false);
    updateData("refresh");
  }

  function routeCreate() {
    history.push("/barang/create");
  }

  function routeEdit(id) {
    history.push("/barang/edit?id=" + id);
  }

  async function updateData(btn) {
    try {
      setDisabled(true);
      const response = await axios.get(apiUrl + "/barang/get_list");
      if (response.data._message === "OK") {
        setData(response.data._data);
        toastMsgHandler(true, btn);
      } else {
        toastMsgHandler(
          false,
          btn,
          response.data._status + " - " + response.data._message
        );
      }
    } catch (err) {
      toastMsgHandler(false, btn, err);
    }
  }

  async function deleteData() {
    try {
      setDisabled(true);
      const response = await axios.delete(apiUrl + "/barang/delete/" + dataId);
      if (response.data._message === "OK") {
        setDataId("");
        setModalShow(false);
        updateData("delete");
      } else {
        toastMsgHandler(
          false,
          "delete",
          response.data._status + " - " + response.data._message
        );
      }
    } catch (err) {
      toastMsgHandler(false, "delete", err);
    }
  }

  useEffect(() => {
    updateData("refresh");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) {
    return (
      <div className="mx-5 my-3">
        <Alert variant="warning">Tidak ada data yang diterima.</Alert>
      </div>
    );
  }

  return (
    <div className="mx-5 my-3">
      <h1>Daftar Data Barang</h1>
      <br />
      <Button
        variant="success"
        size="sm"
        disabled={disabled}
        onClick={routeCreate}
      >
        <FaPlus /> Tambah Data
      </Button>{" "}
      <Button
        variant="secondary"
        size="sm"
        disabled={disabled}
        onClick={() => updateData("refresh")}
      >
        <FaSync /> Segarkan
      </Button>
      <div className="my-2">
        <Table bordered hover striped responsive size="sm" variant="secondary">
          <thead>
            <tr class="text-center">
              <th>#</th>
              <th>ID</th>
              <th>Nama</th>
              <th>Harga</th>
              <th>Kategori</th>
              <th>Waktu Dibuat</th>
              <th>Terakhir Diubah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} class="text-center">
                <td>{i}</td>
                <td>{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.harga}</td>
                <td>{item.kategori}</td>
                <td>
                  {moment(item.created_at).format("DD MMM YYYY HH:mm:ss")}
                </td>
                <td>
                  {moment(item.updated_at).format("DD MMM YYYY HH:mm:ss")}
                </td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={disabled}
                    onClick={() => {
                      routeEdit(item.id);
                    }}
                  >
                    <FaEdit />
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    disabled={disabled}
                    onClick={() => {
                      setDataId(item.id);
                      setModalShow(true);
                    }}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={modalShow} backdrop="static" keyboard={false} centered>
        <Modal.Header>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>Anda yakin ingin menghapus data ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Batal
          </Button>
          <Button variant="danger" onClick={deleteData}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer className="p-3" position="bottom-end">
        <Toast
          onClose={() => setToastShow(false)}
          show={toastShow}
          delay={3000}
          bg="info"
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">
              <FaInfoCircle /> Informasi
            </strong>
          </Toast.Header>
          <Toast.Body>{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Barang;
