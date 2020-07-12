class VideoGamesController < ApplicationController
  before_action :get_genre, only: [:index, :show, :new, :create, :edit, :update, :destroy]

  
  def index
    @video_games = @genre.video_games

    render json: @video_games
  end


  def show 
    @video_game = @genre.video_games.find(params[:id])
    render json: @video_game
  end

  # POST /video_games
  def create
    @video_game = VideoGame.new(video_game_params)

    if @video_game.save
      render json: @video_game, status: :created, location: @video_game
    else
      render json: @video_game.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /video_games/1
  def update
    if @video_game.update(video_game_params)
      render json: @video_game
    else
      render json: @video_game.errors, status: :unprocessable_entity
    end
  end

  # DELETE /video_games/1
  def destroy
    @video_game.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_video_game
    #   @video_game = VideoGame.find(params[:id])
    # end

    def get_genre
      @genre = Genre.find(params[:genre_id])
    end 

    # Only allow a trusted parameter "white list" through.
    def video_game_params
      params.require(:video_game).permit(:name, :new, :pre_owned, :stars, :image, :company_name, :rated, :genre_id)
    end
end
