class PhotosController < ApplicationController
  skip_before_action :require_login, only: %i[index show]

  def index
    @pagy, @photos = pagy(Photo.all)
  end

  def show; end

  def new
    @photo = Photo.new
  end

  def create
    @photo = current_user.photos.build(photo_params)
    @tag_names = tag_params[:tag_names]
    if @photo.save_with_tags(tag_params)
      redirect_to photos_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit; end

  private

  def photo_params
    params.require(:photo).permit(:image, :image_cache)
  end

  def tag_params
    params.require(:photo).permit(:tag_names)
  end
end
