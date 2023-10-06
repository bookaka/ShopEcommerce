import Product from "../models/Product.js";

/** find product */

export const searchProduct = async (req, res) => {
    try {
      const search = req.query.search || '';
      const tags = req.query.tags || '';
      const sort = req.query.sort ||'';
      const colors = req.query.colors ||'';
      colors = colors.split(',');
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 20;
      
      const filter = {};
      filter.TenSp = { $regex: new RegExp(search, 'i') };
      if (tags) {
        filter.Tag = { $in: tags.split(',') };
      }
      if (colors) { 
        filter.Color = { $in: colors.split(',') };
      }
      let sortOption = {};
      if (sort === 'asc') {
        sortOption = { Gia: 1 };
      } else if (sort === 'desc') {
        sortOption = { Gia: -1 }; 
      }
      const skip = (page - 1) * pageSize;
      const totalProducts = await Product.countDocuments(filter);
      const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize);
      res.json({
        products: products,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / pageSize),
        totalProducts: totalProducts,
        success: true,
      });

   } catch (e) {
     res.status(500).json({ message: e.message });
   }
 };

/** get product */
export const infProduct = async (req, res) => {
  try {
    let _idP = req.params.idP;
    const infProduct = await Product.findOne({ _id: _idP });
    res.status(200).json({ infProduct,success: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


