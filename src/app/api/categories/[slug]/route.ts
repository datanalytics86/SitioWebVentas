import { NextRequest } from 'next/server';
import { query } from '@/lib/db/config';
import { successResponse, errorResponse, handleApiError } from '@/lib/utils/api-response';
import { Category } from '@/types';

/**
 * GET /api/categories/[slug]
 * Get a category by slug with its subcategories
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Get category
    const categoryResult = await query(
      `SELECT id, name, slug, description, icon, parent_id,
              order_index, is_active, created_at, updated_at
       FROM categories
       WHERE slug = $1 AND is_active = true`,
      [slug]
    );

    if (categoryResult.rows.length === 0) {
      return errorResponse('Category not found', 404);
    }

    const category = categoryResult.rows[0] as Category;

    // Get subcategories
    const subcategoriesResult = await query(
      `SELECT id, name, slug, description, icon, parent_id,
              order_index, is_active, created_at, updated_at
       FROM categories
       WHERE parent_id = $1 AND is_active = true
       ORDER BY order_index ASC, name ASC`,
      [category.id]
    );

    const response = {
      ...category,
      subcategories: subcategoriesResult.rows as Category[],
    };

    return successResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
}
