import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiFilter } from "react-icons/fi";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [modalMode, setModalMode] = useState(null);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchEmployees = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("employees")
      .select(`
        id,
        full_name,
        email,
        risk_status,
        created_at,
        department_id,
        department:departments(name)
      `);
    if (!error) setEmployees(data || []);
    setLoading(false);
  };

  const fetchDepartments = async () => {
    const { data, error } = await supabase.from("departments").select("id, name");
    if (!error) setDepartments(data || []);
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.full_name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());
    const matchesRisk = riskFilter === "all" || emp.risk_status === riskFilter;
    const matchesDept = deptFilter === "all" || emp.department_id === parseInt(deptFilter);
    return matchesSearch && matchesRisk && matchesDept;
  });

  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      full_name: form.full_name.value,
      email: form.email.value,
      department_id: form.department_id.value || null,
      risk_status: form.risk_status.value,
    };
    if (modalMode === "add") {
      await supabase.from("employees").insert([payload]);
    } else {
      await supabase.from("employees").update(payload).eq("id", currentEmployee.id);
    }
    setModalMode(null);
    setCurrentEmployee(null);
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    await supabase.from("employees").delete().eq("id", id);
    fetchEmployees();
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <div className="flex items-center border rounded px-2">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search employees..."
            className="input input-sm border-0 focus:outline-none"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex items-center border rounded px-2">
          <FiFilter className="text-gray-500 mr-1" />
          <select
            className="select select-sm border-0 focus:outline-none"
            value={riskFilter}
            onChange={(e) => {
              setRiskFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Risks</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>
        <div className="flex items-center border rounded px-2">
          <FiFilter className="text-gray-500 mr-1" />
          <select
            className="select select-sm border-0 focus:outline-none"
            value={deptFilter}
            onChange={(e) => {
              setDeptFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="btn btn-primary btn-sm ml-auto flex items-center gap-1"
          onClick={() => setModalMode("add")}
        >
          <FiPlus /> Add Employee
        </button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Risk Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.full_name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department?.name || "-"}</td>
                  <td>{emp.risk_status}</td>
                  <td className="flex justify-center gap-2">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => {
                        setModalMode("edit");
                        setCurrentEmployee(emp);
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(emp.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedEmployees.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <div className="join">
            <button
              className="join-item btn btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              «
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`join-item btn btn-sm ${
                  currentPage === i + 1 ? "btn-active" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="join-item btn btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}

      {modalMode && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">
              {modalMode === "add" ? "Add Employee" : "Edit Employee"}
            </h3>
            <form onSubmit={handleSave} className="space-y-3">
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                defaultValue={currentEmployee?.full_name || ""}
                className="input input-bordered w-full"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={currentEmployee?.email || ""}
                className="input input-bordered w-full"
                required
              />
              <select
                name="department_id"
                defaultValue={currentEmployee?.department_id || ""}
                className="select select-bordered w-full max-h-48 overflow-y-auto"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <select
                name="risk_status"
                defaultValue={currentEmployee?.risk_status || "low"}
                className="select select-bordered w-full"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setModalMode(null);
                    setCurrentEmployee(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}
