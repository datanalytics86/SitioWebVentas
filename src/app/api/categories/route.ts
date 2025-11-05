import { NextRequest } from 'next/server';
import { query } from '@/lib/db/config';
import { successResponse, handleApiError } from '@/lib/utils/api-response';
import { Category } from '@/types';

/**
 * GET /api/categories
 * Get all categories with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get('parent_id');
    const includeInactive = searchParams.get('include_inactive') === 'true';

    let queryText = `
      SELECT id, name, slug, description, icon, parent_id,
             order_index, is_active, created_at, updated_at
      FROM categories
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramCount = 1;

    // Filter by parent_id
    if (parentId) {
      queryText += ` AND parent_id = $${paramCount}`;
      params.push(parentId);
      paramCount++;
    } else if (parentId === null || searchParams.has('parent_id')) {
      // Get only root categories
      queryText += ` AND parent_id IS NULL`;
    }

    // Filter inactive categories
    if (!includeInactive) {
      queryText += ` AND is_active = true`;
    }

    queryText += ` ORDER BY order_index ASC, name ASC`;

    const result = await query(queryText, params);

    // Get subcategories for each category if no parent_id filter
    const categories = result.rows as Category[];

    if (!parentId) {
      // Fetch all subcategories
      const subcategoriesResult = await query(
        `SELECT id, name, slug, description, icon, parent_id,
                order_index, is_active, created_at, updated_at
         FROM categories
         WHERE parent_id IS NOT NULL ${!includeInactive ? 'AND is_active = true' : ''}
         ORDER BY order_index ASC, name ASC`
      );

      const subcategories = subcategoriesResult.rows as Category[];

      // Group subcategories by parent_id
      const subcategoriesMap = subcategories.reduce((acc, sub) => {
        if (!acc[sub.parent_id!]) {
          acc[sub.parent_id!] = [];
        }
        acc[sub.parent_id!].push(sub);
        return acc;
      }, {} as Record<string, Category[]>);

      // Add subcategories to each category
      const categoriesWithSubs = categories.map((cat) => ({
        ...cat,
        subcategories: subcategoriesMap[cat.id] || [],
      }));

      return successResponse(categoriesWithSubs);
    }

    return successResponse(categories);
  } catch (error) {
    return handleApiError(error);
  }
}
