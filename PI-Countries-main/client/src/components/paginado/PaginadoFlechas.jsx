

const PaginationArrow = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div>
      {currentPage > 1 && (
        <button onClick={onPrevPage}>{"<"}</button>
      )}
      <span style={{color:"white", margin:"5px"}}>{`Página ${currentPage} de ${totalPages}`}</span>
      {currentPage < totalPages && (
        <button onClick={onNextPage}>{">"}</button>
      )}
    </div>
  );
};

export default PaginationArrow;
