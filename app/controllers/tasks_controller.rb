class TasksController < ApplicationController
  before_action :authenticate_user
  before_action :is_current_user
  before_action :set_task, only: [:show, :update, :destroy]

  # GET /tasks
  def index
    @tasks = Task.all
    if params[:user_id]
      @tasks = Task.where( user_id: params[:user_id] )
    end
    render json: @tasks
  end

  # GET /tasks/1
  def show
    render json: @task
  end

  # POST /tasks
  def create
    @task = current_user.tasks.build(task_params)

    if @task.save
      render json: @task, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy
  end

  def delete_multiple
    ids = params[:ids]
    current_user.tasks.where(id: ids).destroy_all
  end

  def change_active_multiple
    ids = params[:ids]
    active = params[:active]
    if current_user.tasks.where(id: ids).update_all(active: active)
      render :json => { :ids => ids, :active => active }
    else
      render json: current_user.tasks.errors, status: :unprocessable_entity
    end
  end

  private
    # See if this is current user
    def is_current_user
      if current_user.id.to_s != params[:user_id]
        render json: {status: "Can't give you someone else info"} , status: 401
      end
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def task_params
      params.require(:task).permit(:title, :description, :priority, :due_date)
    end
end
