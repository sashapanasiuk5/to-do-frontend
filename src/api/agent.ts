import axios, { AxiosResponse } from 'axios';
import TaskDto from '../models/TaskDto';
import { Task } from '../models/Task';
import { Status } from '../models/Status';

const agent = axios.create({
    baseURL: 'https://localhost:44331/',
    transformResponse: (data) => JSON.parse(data),
    headers: {
        Accept: 'application/json'
      },
  });

const responseData = <T> (response: AxiosResponse<T>) => response.data;

export const getAllTasks = async (): Promise<Task[]> => agent.get<Task[]>('/tasks').then(responseData);

export const getAllStatuses = async ():Promise<Status[]> => agent.get<Status[]>('/statuses').then(responseData);

export const createTask = (dto: TaskDto): Promise<Task> => agent.post<Task>('/tasks', dto).then(responseData)

export const updateTask = async (dto: TaskDto) => agent.put('/tasks', dto)

export const deleteTask = async (id: number) => agent.delete('/tasks')