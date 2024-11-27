// src/components/Tour/InclusionsExclusions.js
import React from "react";
import { ListGroup } from "react-bootstrap";

const InclusionsExclusions = ({ incAndExc }) => {
  if (!incAndExc) {
    return <p>Không có thông tin Bao gồm và Loại trừ</p>;
  }

  const inclusionSection = incAndExc
    .match(/BAO GỒM:(.*?)(LOẠI TRỪ:|$)/s)?.[1]
    ?.trim();

  const exclusionSection = incAndExc
    .match(/LOẠI TRỪ:(.*?)(BAO GỒM:|$)/s)?.[1]
    ?.trim();

  return (
    <div>
      {/* Inclusions */}
      {inclusionSection && (
        <div className="mb-4">
          <h4 className="font-bold text-success mb-3 border-bottom pb-2">
            <i className="bi bi-check-circle-fill me-2"></i> Bao gồm
          </h4>
          {inclusionSection.split("\n").map((line, index) => (
            <ListGroup.Item
              className="border-0 pt-0 body-text d-flex align-items-center"
              key={`inclusion-${index}`}
            >
              {line.trim()}
            </ListGroup.Item>
          ))}
        </div>
      )}

      {/* Exclusions */}
      {exclusionSection && (
        <div>
          <h4 className="font-bold text-danger mb-3 border-bottom pb-2">
            <i className="bi bi-x-circle-fill me-2"></i> Loại trừ
          </h4>
          {exclusionSection.split("\n").map((line, index) => (
            <ListGroup.Item
              className="border-0 pt-0 body-text d-flex align-items-center"
              key={`exclusion-${index}`}
            >
              {line.trim()}
            </ListGroup.Item>
          ))}
        </div>
      )}
    </div>
  );
};

export default InclusionsExclusions;
