export type EditFormData = {
  id: number;
  title: string;
};
export type SubmitFormData = {
  title: string;
  completed: boolean;
};

export interface TodoFromApi {
  _id: number;
  title: string;
  completed: boolean;
}

export interface TodoType {
  _id: number;
  title: string;
  completed: boolean;
}

export type FormInput = {
  title: string;
};

export type EditTitleParameter = {
  id: number;
  title: string;
};

export type setFormOpenFunction = (formOpen: boolean) => void;

export type setMyTodosFunction = (myTodos: TodoType[]) => void;
