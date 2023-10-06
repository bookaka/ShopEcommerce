
import Order from '../models/Order';

/** Update order status */
export const updateOrderStatus = async (req,res) =>{
   try{
      const idOrder = req.params.idOrder;
      const status = req.body.status;
      const order = await Order.findById(idOrder);
      if (!order) {
         return res.status(404).json({ message: 'order not found' });
       }
      order.TrangThai = status;
      await order.save();
      res.status(200).json({success: true});


   }catch(e){
      res.status(500).json({ message: e.message });
   }
}

/** Get Revenue Order */
export const getRevenueOrder = async (req, res) => {
   try{
      const { startDate, endDate, year, month } = req.body;
      if (startDate && endDate) {
         const orders = await Order.find({
            TimeReal: { $gte: new Date(startDate), $lte: new Date(endDate) },
            TrangThai: { $ne: 'Đã Hủy' }, 
          });
    
          const revenue = orders.reduce((totalRevenue, order) => totalRevenue + order.Tongtien, 0);
    
          res.json({ revenue: revenue, totalOrder: orders.length,success: true});
      }else if (year && month) { 
         const firstDayOfMonth = new Date(year, month - 1, 1);
         const lastDayOfMonth = new Date(year, month, 0);
         const orders = await Order.find({
            TimeReal: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
            TrangThai: { $ne: 'Đã Hủy' }, 
          });
          const revenue = orders.reduce((totalRevenue, order) => totalRevenue + order.Tongtien, 0);

          res.json({ revenue: revenue, totalOrde: orders.length,success: true});
      }
   }catch(e){
      res.status(500).json({ message: e.message });
   }
}
/** Get order */
export const getOrder = async (req, res) => {
   try{
      const startDate = req.query.startDate||'';
      const endDate = req.query.endDate||'';
      const status = req.query.status || '';
      const page = parseInt(req.query.pages) || 1;
      const pageSize = parseInt(req.query.pageSize) || 20;
      const query = {};

    if (startDate && endDate) {
      query.TimeReal = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    if (status) {
      query.TrangThai = status;
    }
    const skip = (page - 1) * pageSize;
    const orders = await Order.find(query)
    .skip(skip)
    .limit(pageSize);
    res.json({
      results: orders,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / pageSize),
      success: true,
    });

      
      
   }catch(e){
      res.status(500).json({ message: e.message });
   }
}