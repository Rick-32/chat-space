json.arry! @new_messages do |new_message|
  json.id new_message.id
  json.content new_message.content
  json.image new_message.image
  json.user_name new_message.user.name
  json.date format_posted_time(new_message.created_at)
end
