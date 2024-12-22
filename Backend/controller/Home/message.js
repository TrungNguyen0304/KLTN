    const Message = require("../../models/Message");
    const User = require("../../models/user");

    const createMessage = async (req, res) => {
        try {
            const { message } = req.body;

            // Kiểm tra nội dung tin nhắn
            if (!message || message.length < 5) {
                return res.status(400).json({
                    message: "Tin nhắn phải có ít nhất 5 ký tự",
                });
            }

            // Lấy ID người dùng từ middleware xác thực
            const userId = req.user?._id;
            if (!userId) {
                return res.status(401).json({
                    message: "Bạn cần đăng nhập để thực hiện hành động này",
                });
            }

            // Tạo tin nhắn mới
            const newMessage = new Message({
                message,
                userId, // Lưu thông tin người dùng vào đúng trường trong schema
            });

            await newMessage.save();

            // Trả về tin nhắn vừa tạo
            res.status(201).json({
                message: "Tin nhắn đã được tạo thành công!",
                data: newMessage,
            });
        } catch (error) {
            console.error("Lỗi khi tạo tin nhắn:", error);
            res.status(500).json({
                message: "Tạo tin nhắn không thành công",
                error: error.message,
            });
        }
    };

    const getAllMessages = async (req, res) => {
        try {
        // Truy vấn tất cả các tin nhắn từ cơ sở dữ liệu và populate với các trường firstname, lastname, email
        const messages = await Message.find()
            .populate('userId', 'firstname lastname email phoneNumber'); // include email here
    
        if (!messages || messages.length === 0) {
            return res.status(404).json({
            message: "Không có tin nhắn nào",
            });
        }
    
        // Trả về danh sách tin nhắn
        res.status(200).json({
            message: "Danh sách tin nhắn",
            data: messages,
        });
        } catch (error) {
        console.error("Lỗi khi lấy tất cả tin nhắn:", error);
        res.status(500).json({
            message: "Lấy tin nhắn không thành công",
            error: error.message,
        });
        }
    };
    const deleteMessage = async (req, res) => {
        try {
            const { messageId } = req.params;

            // Kiểm tra tin nhắn có tồn tại không
            const message = await Message.findById(messageId);
            if (!message) {
                return res.status(404).json({
                    message: "Tin nhắn không tồn tại",
                });
            }

            // Xóa tin nhắn
            await message.deleteOne();

            // Trả về thông báo thành công
            res.status(200).json({
                message: "Tin nhắn đã được xóa thành công",
            });
        } catch (error) {
            console.error("Lỗi khi xóa tin nhắn:", error);
            res.status(500).json({
                message: "Xóa tin nhắn không thành công",
                error: error.message,
            });
        }
    };


    const searchMessage = async (req, res) => {
        try {
            const { searchQuery } = req.query;
        
            // Modify the filter to use firstname and lastname (you can change this to other fields if needed)
            const filter = searchQuery
              ? {
                  $or: [
                    { firstname: { $regex: searchQuery, $options: "i" } }, // Search by firstname (case-insensitive)
                    { lastname: { $regex: searchQuery, $options: "i" } },  // Search by lastname (case-insensitive)
                  ]
              }
              : {};
        
            // Perform the search query on the User model using the filter
            const users = await User.find(filter);
        
            if (!users || users.length === 0) {
              return res.status(404).json({
                message: "Không tìm thấy người dùng nào",
              });
            }
        
            // Return the found users
            res.status(200).json({
              message: "Danh sách người dùng",
              data: users,
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ message: "Lỗi khi tìm kiếm người dùng", error: error.message });
        }
    };
    

    module.exports ={
        createMessage,
        getAllMessages,
        deleteMessage,
        searchMessage
    };