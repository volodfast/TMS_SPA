require 'active_support/core_ext/hash/except.rb'

class UsersController < ApplicationController
  before_action :authenticate_user
  before_action :is_current_user, only: [:show, :update, :destroy]
  before_action :set_user, only: [:show, :update, :destroy]
  
  skip_before_action :authenticate_user, only: [:create]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    user_info = {
      id: @user.id,
      first_name: @user.first_name,
      last_name: @user.last_name,
      email: @user.email
    }

    render json: user_info
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      user_info = {
        id: @user.id,
        first_name: @user.first_name,
        last_name: @user.last_name,
        email: @user.email
      }
      render json: user_info, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      user_info = {
        id: @user.id,
        first_name: @user.first_name,
        last_name: @user.last_name,
        email: @user.email
      }
      render json: user_info
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end

    def is_current_user
      if current_user.id.to_s != params[:user_id]
        render json: {status: "Can't give you someone else info"} , status: 401
      end
    end
end
