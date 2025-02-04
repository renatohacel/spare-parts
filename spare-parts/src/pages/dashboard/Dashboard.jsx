import React, { useRef, useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { Card } from "../../components/templates/Card";
import { DashboardContext } from "../../context/DashboardContext";

// Material UI
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

// Estructura que define tu layout de racks
const rackLayout = [
  [
    [33, 32, 31],
    [30, 29, 28],
  ],
  [
    [27, 26, 25],
    [24, 23, 22],
  ],
  [
    [21, 20, 19],
    [18, 17, 16],
  ],
  [
    [15, 14, 13],
    [12, 11, 10],
  ],
  [
    [9, 8, 7],
    [6, 5, 4],
  ],
  [[3, 2, 1]],
];

export const Dashboard = () => {
  const navigate = useNavigate();

  // Obtenemos inventory y la función para cargarlo
  const { inventoryHook } = useContext(DashboardContext);
  const { inventory, getInventory } = inventoryHook;

  // Estado del Autocomplete
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Rack resaltado y sub-posición (A, B, C, D, etc.)
  const [highlightRack, setHighlightRack] = useState(null);
  const [highlightLetter, setHighlightLetter] = useState(null);

  const [notFound, setNotFound] = useState({
    isVisible: false,
    message: "",
  });

  // Referencias para hacer scroll a cada rack
  const rackRefs = useRef({});

  useEffect(() => {
    getInventory();
  }, []);

  useEffect(() => {
    if (!searchText.trim()) {
      setNotFound({ isVisible: false, message: "" });
    }
  }, [searchText]);

  // Cómo se muestra cada opción en el Autocomplete
  const getOptionLabel = (item) => {
    if (!item) return "";
    return `${item.id_feature || ""} - ${item.name || ""} - ${
      item.part_num || ""
    } - ${item.suplier_part_num || ""}`;
  };

  // Cuando se elige un valor en el Autocomplete
  const handleAutoCompleteChange = (event, newValue) => {
    setSelectedItem(newValue || null);

    if (newValue) {
      const label = getOptionLabel(newValue);
      setSearchText(label);

      // Extraer la ubicación (ej. "19-B") => rack=19, letter=B
      const locationStr = newValue.location || "";

      const match = locationStr.match(/^(\d+)(-[A-D])?$/i);
      if (match) {
        const rackNum = parseInt(match[1], 10);
        const letter = match[2] ? match[2].replace("-", "") : null;
        setHighlightRack(rackNum);
        setHighlightLetter(letter);

        // Hacer scroll
        if (rackRefs.current[rackNum]) {
          rackRefs.current[rackNum].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      } else {
        // Si no coincide, no hay rack/letter que resaltar
        setHighlightRack(null);
        setHighlightLetter(null);
        setNotFound({
          isVisible: true,
          message: `${newValue.name} not found in racks, it is in ${newValue.location}`,
        });
      }
    } else {
      setSearchText("");
      setHighlightRack(null);
      setHighlightLetter(null);
    }
  };

  // Determina si un rack está deshabilitado
  const isRackDisabled = (rackNum) => rackNum === 32 || rackNum === 31;

  // Click en un rack => navegar al detalle "/rack/:rackNum"
  const handleRackClick = (rackNum) => {
    navigate(`/rack/${rackNum}`, {
      state: {
        letter_dashboard: highlightLetter,
      },
    });
  };

  console.log(notFound);

  return (
    <main className="flex-1 p-8 text-slate-500">
      <div className="flex flex-row gap-2 text-3xl font-bold">
        <IoIosArrowForward className="mt-[4px]" />
        <FaHome className="mt-[4px]" />
        <h2 className="mb-6">Home</h2>
      </div>

      <Card>
        <div className="flex flex-row justify-between">
          <h2 className="mb-6 font-medium text-xl">Racks Layout</h2>

          {/* Autocomplete */}
          <Autocomplete
            className="w-[300px]"
            options={inventory}
            getOptionLabel={getOptionLabel}
            value={selectedItem}
            inputValue={searchText}
            onInputChange={(e, newVal) => setSearchText(newVal)}
            onChange={handleAutoCompleteChange}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search..."
                variant="outlined"
                size="small"
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    color: "#94a3b8",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#94a3b8",
                      borderWidth: 2,
                      color: "#94a3b8",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "0.875rem",
                    color: "#94a3b8",
                  },
                }}
              />
            )}
          />
        </div>

        {/* Layout de racks */}
        <div className="grid p-10 gap-10 grid-flow-row bg-slate-100 rounded-lg">
          {notFound.isVisible && (
            <div className="text-center animation fadeIn transition-all duration-300 bg-orange-200 text-orange-400 bg-opacity-50 border-opacity-50 text-opacity-60 rounded-lg border border-orange-500 p-2">
              {notFound.message}.{" "}
              <NavLink
                className="hover:text-orange-400 underline transition-all duration-200"
                to="/inventory"
              >
                Check the inventory
              </NavLink>
            </div>
          )}
          {rackLayout.map((block, blockIndex) => (
            <>
              <div key={blockIndex} className="row-span-1">
                {block.map((row, rowIndex) => (
                  <>
                    <div
                      key={rowIndex}
                      className={`px-3 py-5 items-center flex flex-row gap-3 justify-between bg-slate-300 bg-opacity-70 text-center rounded-lg h-14 shadow-lg ${
                        rowIndex > 0 ? "mt-1" : ""
                      }`}
                    >
                      {row.map((rackNum) => {
                        const isHighlighted = rackNum === highlightRack;
                        const disabled = isRackDisabled(rackNum);

                        return (
                          <button
                            key={rackNum}
                            ref={(el) => (rackRefs.current[rackNum] = el)}
                            disabled={disabled}
                            onClick={() => handleRackClick(rackNum)}
                            className={`
                          rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono 
                          transition-all duration-500
                          ${
                            isHighlighted
                              ? "-translate-y-3 bg-teal-600 shadow-2xl shadow-green-700 hover:bg-teal-500 focus:outline-none focus:ring-teal-700 focus:ring-2"
                              : "bg-slate-600 hover:shadow-2xl hover:bg-slate-400 hover:-translate-y-3"
                          }
                          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                          >
                            RACK {rackNum}
                          </button>
                        );
                      })}
                    </div>
                  </>
                ))}
              </div>
              <hr />
            </>
          ))}
        </div>
      </Card>
    </main>
  );
};
