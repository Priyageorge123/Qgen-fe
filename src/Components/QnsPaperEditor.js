import { useCallback, useReducer } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import produce from "immer";
import { ReactComponent as DragMenu } from "../Common/dragmenu.svg";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Button, IconButton } from "@material-ui/core";

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "MOVE": {
      draft[action.from] = draft[action.from] || [];
      draft[action.to] = draft[action.to] || [];
      const [removed] = draft[action.from].splice(action.fromIndex, 1);
      draft[action.to].splice(action.toIndex, 0, removed);
    }
  }
});

const QnsPaperEditor = ({ data, handleContinue, setStatus }) => {
  const [state, dispatch] = useReducer(dragReducer, {
    partA: data.partA,
    partB: data.partB,
    partC: data.partC,
  });

  const onDragEnd = useCallback((result) => {
    if (result.reason === "DROP") {
      if (!result.destination) {
        return;
      }
      dispatch({
        type: "MOVE",
        from: result.source.droppableId,
        to: result.destination.droppableId,
        fromIndex: result.source.index,
        toIndex: result.destination.index,
      });
    }
  }, []);

  return (
    <div className={`max-w-4xl mt-10 mb-20 mx-auto p-4`}>
      <IconButton onClick={(_) => setStatus("FORM")}>
        <ArrowBackIcon />
      </IconButton>
      <DragDropContext onDragEnd={onDragEnd}>
        <h1 className="py-2 text-xl font-semibold text-center">Part A</h1>

        <Droppable droppableId="partA" type="PERSON">
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={
                  (styles.dropper, snapshot.isDraggingOver && styles.dropOver)
                }
              >
                {state.partA?.map((person, index) => {
                  return (
                    <Draggable
                      key={String(person.id)}
                      draggableId={String(person.id)}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            className={
                              (styles.dragger,
                              snapshot.isDragging && styles.dragging) + ""
                            }
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className={styles.draggerContent}>
                              <div className="flex w-full text-sm mt-4 ">
                                <DragMenu
                                  className={
                                    snapshot.isDragging
                                      ? styles.draggerOnIcon
                                      : styles.draggerIcon
                                  }
                                />
                                <div className="w-full flex ">
                                  <span className="pr-4">{index + 1}.</span>{" "}
                                  {person.question_text}
                                </div>
                                <span className="whitespace-nowrap">
                                  ( {3} )
                                </span>
                                <span className="whitespace-nowrap">
                                  {person.level.slice(0, 2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <h1 className="py-2 text-xl font-semibold text-center">Part B</h1>
        <Droppable droppableId="partB" type="PERSON">
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={
                  (styles.dropper, snapshot.isDraggingOver && styles.dropOver)
                }
              >
                {state.partB?.map((person, index) => {
                  return (
                    <Draggable
                      key={String(person.id)}
                      draggableId={String(person.id)}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            className={
                              (styles.dragger,
                              snapshot.isDragging && styles.dragging)
                            }
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className={styles.draggerContent}>
                              <div className="flex w-full text-sm mt-4 ">
                                <DragMenu
                                  className={
                                    snapshot.isDragging
                                      ? styles.draggerOnIcon
                                      : styles.draggerIcon
                                  }
                                />
                                <div className="w-full flex ">
                                  <span className="pr-4">
                                    {state.partA.length + index + 1}.
                                  </span>{" "}
                                  {person.question_text}
                                </div>
                                <span className="whitespace-nowrap">
                                  ( {4} )
                                </span>
                                <span className="whitespace-nowrap">
                                  {person.level.slice(0, 2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <h1 className="py-2 text-xl font-semibold text-center">Part C</h1>

        <Droppable droppableId="partC" type="PERSON">
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={
                  (styles.dropper, snapshot.isDraggingOver && styles.dropOver)
                }
              >
                {state.partC?.map((person, index) => {
                  return (
                    <Draggable
                      key={String(person.id)}
                      draggableId={String(person.id)}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            className={
                              (styles.dragger,
                              snapshot.isDragging && styles.dragging)
                            }
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className={styles.draggerContent}>
                              <div className="flex w-full text-sm mt-4 ">
                                <DragMenu
                                  className={
                                    snapshot.isDragging
                                      ? styles.draggerOnIcon
                                      : styles.draggerIcon
                                  }
                                />
                                <div className="w-full flex ">
                                  <span className="pr-4">
                                    {state.partA.length +
                                      state.partB.length +
                                      index +
                                      1}
                                    .
                                  </span>{" "}
                                  {person.question_text}
                                </div>
                                <span className="whitespace-nowrap">
                                  ( {2} )
                                </span>
                                <span className="whitespace-nowrap">
                                  {person.level.slice(0, 2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
      <div className="flex mt-6 w-full justify-center">
        <Button
          color="primary"
          variant="contained"
          onClick={(_) => handleContinue(state)}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
export default QnsPaperEditor;

const styles = {
  dragger: `px-4 py-4 my-2 transition-colors duration-150 ease-in-out bg-white rounded-lg shadow`,
  dropper: `w-auto px-4 min-w-1/4 max-w-1/2`,
  draggerContent: `flex items-center space-x-3 group text-base hover:bg-blue-50 border cursor-move transition duration-300 pb-3 px-3`,
  draggerIcon: `w-2.5 mt-1 text-gray-300 group-hover:text-gray-400 mb-auto mr-6  `,
  draggerOnIcon: `w-2.5 mt-1  group-hover:text-blue-600 mb-auto mr-6  `,
  dragging: `bg-blue-100 text-blue-700 border-r-4 border-l-4 border-blue-700 shadow-xl transition duration-300`,
  dropOver: `bg-gray-100 transition duration-300`,
};
