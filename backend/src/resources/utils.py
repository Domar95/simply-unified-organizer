from src.models.records.record_category import RecordCategoryModel


def abort_if_category_id_is_invalid(category_id):
    RecordCategoryModel.query.filter_by(id=category_id).first_or_404(
        description="Category with category ID provided for this record does not exit..."
    )
