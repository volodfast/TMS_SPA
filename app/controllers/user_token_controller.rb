class UserTokenController < Knock::AuthTokenController
    skip_before_action :verify_authenticity_token

    def create

        user = User.find(auth_token.payload[:sub])

        user_info = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }

        render json: {
            jwt: auth_token.token,
            user: user_info,
            info: auth_token
          }, status: :created
      end
end
