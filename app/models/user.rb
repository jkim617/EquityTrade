# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  email           :string           not null
#  fname           :string           not null
#  lname           :string           not null
#  funds           :float            default(0.0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    attr_reader :password

    validates :username, :password_digest, :session_token, :email, :fname, :lname, :funds, presence: true
    validates :username, :email, uniqueness: true
    validates :password, length: { minimum: 10, allow_nil: true}

    has_many :transactions,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :Transaction

    after_initialize :ensure_session_token

    def self.find_by_credentials(identifier, password)

        if User.find_by(email: identifier)
            user = User.find_by(email: identifier)
        elsif User.find_by(username: identifier)
            user = User.find_by(username: identifier)
        else
            return nil
        end
    
        user.is_password?(password) ? user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        generate_unique_session_token
        save!
        self.session_token
    end

    private

    def ensure_session_token
        generate_unique_session_token unless self.session_token
    end

    def new_session_token
        SecureRandom.urlsafe_base64
    end

    def generate_unique_session_token
        self.session_token = new_session_token
        while User.find_by(session_token: self.session_token)
        self.session_token = new_session_token
        end
        self.session_token
    end
end
